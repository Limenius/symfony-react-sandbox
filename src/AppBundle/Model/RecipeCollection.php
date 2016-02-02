<?php

namespace AppBundle\Model;

class RecipeCollection
{
    /**
     * @var Recipe[]
     */
    public $recipes;

    /**
     * @var integer
     */
    public $offset;

    /**
     * @var integer
     */
    public $limit;

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
}
