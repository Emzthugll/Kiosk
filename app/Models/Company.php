<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Company extends Model
{
    use HasFactory;

    protected $table = 'companies'; // make sure this matches your DB table name

    protected $fillable = [
        'name',
        'logo',
    ];

    public function vacancies()
    {
        return $this->hasMany(Vacancy::class, 'company_id');
    }
}
