<?php

namespace AppBundle;
use Symfony\Component\Yaml\Parser;
use AppBundle\Model\RecipeCollection;
use AppBundle\Model\Recipe;

class RecipeManager
{
    private $recipeCollection;

    public function __construct()
    {
        $yaml = new Parser();

        $recipesArray = $yaml->parse(file_get_contents(__DIR__.'/Resources/Data/recipe.yml'))['recipes'];
        $recipes = array();
        foreach($recipesArray as $recipeArray) {
            $recipe = new Recipe();
            $recipe->name = $recipeArray['name'];
            $recipe->slug = $recipeArray['slug'];
            $recipe->image = $recipeArray['image'];
            $recipes[] = $recipe;
        }
        $this->recipeCollection = new RecipeCollection($recipes);
    }

    public function findAll()
    {
        return $this->recipeCollection;
    }

    public function findOneBySlug($slug)
    {
        return $this->recipeCollection->findOneBySlug($slug);
    }
}
