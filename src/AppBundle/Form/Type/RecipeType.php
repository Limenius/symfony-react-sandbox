<?php
namespace AppBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type;
use Symfony\Component\Validator\Constraints as Assert;

class RecipeType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', Type\TextType::class, ['label' => 'Name', 'required' => true, 'attr' => ['placeholder' => 'Some name'], 'liform' => ['description' => 'To display server-side validation and to avoid summoning obnoxious ghosts, Beetlejuice is an invalid value for this field.'] ])
            ->add('slug', Type\TextType::class, ['label' => 'Slug', 'liform' => ['description' => 'An explanation of the task']])
            ->add('image', Type\TextType::class, ['label' => 'Image', 'liform' => [ 'widget' => 'file']])
        ;
    }
}
