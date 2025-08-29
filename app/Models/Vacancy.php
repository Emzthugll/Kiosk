<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Vacancy extends Model
{
    use HasFactory;

    protected $table = 'vacancies'; // link to your old vacancies table

    protected $fillable = [
        'company_id',
        'title',
        'details',
        'location',
        'job_type',
        'salary_from',
        'salary_to',
        'total_vacancy',
    ];

    // Relationship: A vacancy belongs to a company
    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }
}
