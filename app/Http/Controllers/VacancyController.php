<?php

namespace App\Http\Controllers;

use App\Models\Vacancy;
use App\Models\Specialization;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class VacancyController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $specializationsFilter = (array) $request->input('specializations', []);
        $jobType = $request->input('job_type');
        $salaryFrom = $request->input('salary_from');
        $salaryTo = $request->input('salary_to');
        $postedDate = $request->input('posted_date');

        
        $specializations = Specialization::with('subSpecializations')->get()
            ->mapWithKeys(function($spec) {
                return [
                    $spec->name => $spec->subSpecializations->pluck('name', 'id')->toArray()
                ];
            });

        
        $activities = DB::table('recruitment_activities')
            ->select(
                'recruitment_activities.id',
                'type',
                'start',
                'end',
                'venue',
                'details',
                DB::raw('GROUP_CONCAT(companies.name SEPARATOR " | ") as related_companies')
            )
            ->leftJoin('company_recruitment_activity', 'recruitment_activities.id', '=', 'company_recruitment_activity.recruitment_activity_id')
            ->leftJoin('companies', 'company_recruitment_activity.company_id', '=', 'companies.id')
            ->groupBy('recruitment_activities.id', 'type', 'start', 'end', 'venue', 'details')
            ->orderBy('recruitment_activities.created_at', 'desc')
            ->limit(4)
            ->get();

        
        $vacancies = Vacancy::with('company')
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                      ->orWhereHas('company', fn($q) => $q->where('name', 'like', "%{$search}%"));
            })
            ->when(!empty($specializationsFilter), fn($query) => $query->whereIn('sub_specialization_id', $specializationsFilter))
            ->when($jobType && $jobType !== 'All Types', fn($q) => $q->where('job_type', $jobType))
            ->when($salaryFrom && $salaryFrom !== 'Any', function($q) use ($salaryFrom) {
                $amount = (int) filter_var($salaryFrom, FILTER_SANITIZE_NUMBER_INT);
                $q->where('salary_from', '>=', $amount);
            })
            ->when($salaryTo && $salaryTo !== 'Any', function($q) use ($salaryTo) {
                $amount = (int) filter_var($salaryTo, FILTER_SANITIZE_NUMBER_INT);
                $q->where('salary_to', '<=', $amount);
            })
            ->when($postedDate && $postedDate !== 'Anytime', function($q) use ($postedDate) {
                $days = match($postedDate) {
                    'Last 24 hours' => 1,
                    'Last 2 days'   => 2,
                    'Last 3 days'   => 3,
                    'Last 7 days'   => 7,
                    default         => null,
                };
                if ($days) $q->where('created_at', '>=', now()->subDays($days));
            })
            ->get();

        return Inertia::render('VacancySearch', [
            'vacancies'        => $vacancies,
            'activities'       => $activities,
            'filters'          => [
                'search'          => $search,
                'specializations' => $specializationsFilter,
                'job_type'        => $jobType,
                'salary_from'     => $salaryFrom,
                'salary_to'       => $salaryTo,
                'posted_date'     => $postedDate,
            ],
            'specializations' => $specializations,
        ]);
    }
}
