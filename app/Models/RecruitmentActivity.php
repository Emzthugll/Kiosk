<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RecruitmentActivity extends Model
{
    use HasFactory;

    protected $table = 'recruitment_activities'; 

    protected $fillable = [
        'type',
        'start',
        'end',
        'venue',
        'details',
    ];

    
    public function companies()
    {
        return $this->belongsToMany(
            Company::class,                
            'company_recruitment_activity', 
            'recruitment_activity_id',     
            'company_id'                   
        );
    }
}
