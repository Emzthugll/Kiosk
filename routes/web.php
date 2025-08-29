<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VacancyController;
use App\Http\Controllers\RecruitmentActivityController;



Route::get('/', [VacancyController::class, 'index'])->name('vacancies.index');



