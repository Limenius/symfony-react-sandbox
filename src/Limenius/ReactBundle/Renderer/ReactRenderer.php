<?php

namespace Limenius\ReactBundle\Renderer;

use Nacmartin\PhpExecJs\PhpExecJs;

class ReactRenderer
{
    protected $logger;
    protected $execJs;
    protected $serverBundlePath;

    public function __construct($logger, PhpExecJs $execJs, $serverBundlePath)
    {
        $this->logger = $logger;
        $this->execJs = $execJs;
        $this->serverBundlePath = $serverBundlePath;
    }

    public function render($componentName, $propsString, $uuid)
    {
        $phpexecjs = new PhpExecJs();
        $serverBundle = file_get_contents($this->serverBundlePath);
        $phpexecjs->createContext($this->consolePolyfill()."\n".$serverBundle);
        $result = json_decode($phpexecjs->evalJs($this->wrap($componentName, $propsString, $uuid)), true);
        //throw new \Exception(var_export($result, true));
        if ($result['hasErrors']) {
            $this->LogErrors($result['consoleReplayScript']);
        }
        return $result['html'].$result['consoleReplayScript'];
    }

    protected function consolePolyfill()
    {
        $console = <<<JS
var console = { history: [] };
['error', 'log', 'info', 'warn'].forEach(function (level) {
  console[level] = function () {
    var argArray = Array.prototype.slice.call(arguments);
    if (argArray.length > 0) {
      argArray[0] = '[SERVER] ' + argArray[0];
    }
    console.history.push({level: level, arguments: argArray});
  };
});
JS;
        return $console;
    }

    protected function wrap($name, $propsString, $uuid)
    {
        $wrapperJs = <<<JS
(function() {
  var props = $propsString;
  return ReactOnRails.serverRenderReactComponent({
    name: 'o$name',
    domNodeId: '$uuid',
    props: props,
    trace: false,
    location: ''
  });
})()
JS;
        return $wrapperJs;
    }

    protected function logErrors($consoleReplay)
    {
        $lines = explode("\n", $consoleReplay);
        $usefulLines = array_slice($lines, 2, count($lines) - 4);
        foreach ($usefulLines as $line) {
            if (preg_match ('/console\.error\.apply\(console, \["\[SERVER\] (?P<msg>.*)"\]\);/' , $line, $matches)) {
                $this->logger->warning($matches['msg']);
            }
        }
    }
}
