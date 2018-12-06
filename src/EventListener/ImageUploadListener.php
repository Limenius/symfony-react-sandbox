<?php
namespace App\EventListener;

use Symfony\Component\HttpFoundation\File\File;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use League\Uri\Components\DataPath;
use App\Entity\Recipe;


class ImageUploadListener
{
    private $targetDir;

    public function __construct($targetDir)
    {
        $this->targetDir = $targetDir;
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();

        $this->uploadFile($entity);
    }

    public function preUpdate(PreUpdateEventArgs $args)
    {
        $entity = $args->getEntity();

        $this->uploadFile($entity);
    }

    private function uploadFile($entity)
    {
        // upload only works for Recipe entities
        if (!$entity instanceof Recipe) {
            return;
        }

        $file = $entity->getImage();

        if (!$file instanceof File) {
            return;
        }

        $fileName = $this->upload($file);
        $entity->setImage($fileName);
    }

    public function upload($file)
    {
        $fileName = md5(uniqid()).'.'.$file->guessExtension();

        $file->move($this->targetDir, $fileName);

        return $fileName;
    }

}
