<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait QueryHelpers
{
    /**
     * Apply sorting to the query.
     *
     * when queried `sort=field1,-field2`, it will be translated to:
     *
     * `SELECT * FROM table ORDER BY field1 ASC, field2 DESC`
     * @param Builder $query
     * @param string $sortParams
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
     * when queried `includes=relation1,relation2`, it will be translated to: `with('relation1', 'relation2')`
     * @param Builder $query
     * @param string $includeParams
     * @return Builder
     */
    public function scopeApplyIncludes(Builder $query, $includeParams)
    {
        if (!$includeParams) return $query;

        $relations = explode(',', $includeParams);
        return $query->with($relations);
    }

    /**
     * Apply field selection to the query result.
     * when queried `fields=field1,field2`, it will be translated to: `SELECT field1, field2`
     * @param Builder $query
     * @param string|null $fields
     * @return Builder
     */
    public function scopeApplyFields(Builder $query, $fields)
    {
        if (!$fields) return $query;

        $fieldsArray = explode(',', $fields);
        return $query->select($fieldsArray);
    }
}
