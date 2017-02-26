<?php
namespace AppBundle\EventListener;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use AppBundle\Entity\Recipe;
use AppBundle\FileUploader;
use Symfony\Component\Serializer\Normalizer\DataUriNormalizer;
use League\Uri\Components\DataPath;
use Symfony\Component\HttpFoundation\File\MimeType\ExtensionGuesser;


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

        $data = $entity->getImage();

        $fileName = $this->upload($data);
        $entity->setImage($fileName);
    }

    public function upload($data)
    {
        $path = new DataPath($data);
        // We should probably use GuessExtension from Symfony File but
        // that would mean to save a temporary file in disk and create a file
        // from it
        $guesser = ExtensionGuesser::getInstance();
        $extension = $guesser->guess($path->getMimeType());
        $fileName = md5(uniqid()).'.'.$extension;
        $fileObject = $path->save($this->targetDir.$fileName, 'w');

        return $fileName;
    }
}
