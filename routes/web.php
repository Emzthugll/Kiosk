<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VacancyController;



Route::get('/', [VacancyController::class, 'index'])->name('vacancies.index');


