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
            ->add('name', Type\TextType::class, ['label' => 'Name', 'required' => true, 'liform' => ['placeholder' => 'Some name'] ])
            ->add('description', Type\TextType::class, ['label' => 'Description', 'liform' => ['widget' => 'textarea', 'description' => 'An explanation of the task']])
            ->add('dueTo', Type\DateTimeType::class, ['label' => 'Due to', 'liform' => [], 'widget' => 'single_text'])
        ;
    }
}
