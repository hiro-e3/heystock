<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait QueryHelpers
{
    /**
     * Apply sorting to the query.
     */
    public function scopeApplySort(Builder $query, $sortParams)
    {
        if (!$sortParams) return $query;

        $fields = explode(',', $sortParams);
        foreach ($fields as $field) {
            $direction = 'asc';
            if (strpos($field, '-') === 0) {
                $direction = 'desc';
                $field = substr($field, 1);
            }
            $query->orderBy($field, $direction);
        }

        return $query;
    }

    /**
     * Apply eager loading for includes.
     */
    public function scopeApplyIncludes(Builder $query, $includeParams)
    {
        if (!$includeParams) return $query;

        $relations = explode(',', $includeParams);
        return $query->with($relations);
    }

    /**
     * Apply field selection to the query result.
     */
    public function scopeApplyFields(Builder $query, $fields)
    {
        if (!$fields) return $query;

        $fieldsArray = explode(',', $fields);
        return $query->select($fieldsArray);
    }
}
