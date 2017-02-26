<?php
namespace AppBundle\EventListener;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use AppBundle\Entity\Recipe;
use AppBundle\FileUploader;
use Symfony\Component\Serializer\Normalizer\DataUriNormalizer;
use League\Uri\Components\DataPath as Path;


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
        // upload only works for Product entities
        if (!$entity instanceof Recipe) {
            return;
        }

        $data = $entity->getImage();

        $path = new Path($data);
        //throw new \Exception( $path->isBinaryData()? 't':'f');
        $fileName = md5(uniqid()).'.jpg';
        $fileObject = $path->save($this->targetDir.$fileName, 'w');
        // only upload new files
        //if (!$file instanceof UploadedFile) {
        //    return;
        //}

        //$fileName = $this->uploader->upload($file);
        $entity->setImage($fileName);
    
    }

    public function upload()
    {
        //$fileName = md5(uniqid()).'.'.$file->guessExtension();
        $fileName = md5(uniqid().'.jpg');

        $file->move($this->targetDir, $fileName);

        return $fileName;
    }
}
