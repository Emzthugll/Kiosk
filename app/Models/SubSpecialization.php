<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubSpecialization extends Model
{
    protected $fillable = ['specialization_id', 'name'];

    public function specialization()
    {
        return $this->belongsTo(Specialization::class);
    }
}
