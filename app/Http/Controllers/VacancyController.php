<?php

// app/Http/Controllers/VacancyController.php
namespace App\Http\Controllers;

use App\Models\Vacancy;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VacancyController extends Controller
{
    public function index(Request $request)
{
    $search = $request->input('search');

    $vacancies = Vacancy::with('company')
        ->when($search, function ($query, $search) {
            
            $query->where('title', 'like', "%{$search}%")
                  ->orWhereHas('company', function ($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  });
        }, function ($query) {
            
            $query->latest()->take(9);
        })
        ->get();

    return Inertia::render('VacancySearch', [
        'vacancies' => $vacancies,
        'search'    => $search,
    ]);
}

}
