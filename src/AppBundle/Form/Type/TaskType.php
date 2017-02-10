<?php
namespace AppBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type;
use Symfony\Component\Validator\Constraints as Assert;

class TaskType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', Type\TextType::class, ['label' => 'Name', 'required' => true, 'attr' => ['placeholder' => 'Some name'], 'liform' => ['description' => 'To display server-side validation and to avoid summoning obnoxious ghosts, Beetlejuice is an invalid value for this field.'] ])
            ->add('description', Type\TextType::class, ['label' => 'Description', 'liform' => ['widget' => 'textarea', 'description' => 'An explanation of the task']])
            ->add('dueTo', Type\DateTimeType::class, ['label' => 'Due to', 'liform' => [], 'widget' => 'single_text'])
        ;
    }
}
