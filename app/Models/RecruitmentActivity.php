<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RecruitmentActivity extends Model
{
    use HasFactory;

    protected $table = 'recruitment_activities'; // link to your old vacancies table

    protected $fillable = [
        'type',
        'start',
        'end',
        'venue',
        'details',
    ];

   
}
