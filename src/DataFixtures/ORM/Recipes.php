<?php

namespace App\DataFixtures\ORM;

use App\Entity\Recipe;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class Fixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $recipe1 = new Recipe();
        $recipe1->setName('Paella');
        $recipe1->setDescription('smth');
        $recipe1->setImage('paella.jpg');
        $manager->persist($recipe1);

        $recipe2 = new Recipe();
        $recipe2->setName('Carbonara');
        $recipe2->setDescription('smth');
        $recipe2->setImage('carbonara.jpg');
        $manager->persist($recipe2);

        $recipe3 = new Recipe();
        $recipe3->setName('Falafel');
        $recipe3->setDescription('smth');
        $recipe3->setImage('falafel.jpg');
        $manager->persist($recipe3);

        $recipe4 = new Recipe();
        $recipe4->setName('Sushi');
        $recipe4->setDescription('smth');
        $recipe4->setImage('sushi.jpg');
        $manager->persist($recipe4);

        $manager->flush();
    }
}
