<?php

namespace App\DataFixtures\ORM;

use App\Entity\Recipe;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class Recipes extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consequat efficitur venenatis. Proin eros nisl, maximus id tristique et, placerat a felis. Integer finibus lacinia pretium. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla ipsum libero, fringilla id mollis molestie, maximus quis lectus. Sed euismod, risus interdum mattis rhoncus, lectus sem lacinia eros, eu gravida sapien nunc eu risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras ultrices nunc eget congue viverra. Nulla finibus metus mi, in porttitor neque laoreet quis. Proin ut lacinia felis, sit amet mollis ligula. In tincidunt posuere volutpat. Morbi aliquet nunc dolor, ut consequat lacus maximus vitae. Donec orci sem, interdum quis scelerisque et, tincidunt ut nibh. Vivamus bibendum suscipit urna, et rutrum felis suscipit non.";
        $recipe1 = new Recipe();
        $recipe1->setName('Paella');
        $recipe1->setDescription($lorem);
        $recipe1->setImage('paella.jpg');
        $manager->persist($recipe1);

        $recipe2 = new Recipe();
        $recipe2->setName('Carbonara');
        $recipe2->setDescription($lorem);
        $recipe2->setImage('carbonara.jpg');
        $manager->persist($recipe2);

        $recipe3 = new Recipe();
        $recipe3->setName('Falafel');
        $recipe3->setDescription($lorem);
        $recipe3->setImage('falafel.jpg');
        $manager->persist($recipe3);

        $recipe4 = new Recipe();
        $recipe4->setName('Sushi');
        $recipe4->setDescription($lorem);
        $recipe4->setImage('sushi.jpg');
        $manager->persist($recipe4);

        $manager->flush();
    }
}
