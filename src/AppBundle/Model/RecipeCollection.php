<?php

namespace AppBundle\Model;

class RecipeCollection
{
    /**
     * @var Recipe[]
     */
    public $recipes;

    /**
     * @param Recipe[]  $recipes
     * @param integer $offset
     * @param integer $limit
     */
    public function __construct($recipes = array(), $offset = null, $limit = null)
    {
        $this->recipes = $recipes;
        $this->offset = $offset;
        $this->limit = $limit;
    }

    public function findOneBySlug($slug)
    {
        foreach ($this->recipes as $recipe) {
            if ($recipe->slug == $slug) {
                return $recipe;
            }
        }
        return null;
    }
}
