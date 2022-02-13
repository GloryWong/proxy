# @gloxy/proxy

Proxy for command execute or permanent proxy setting.

# Usage

```shell
$ proxy --help
  Gloxy Proxy v0.1.0

  Description:
    Proxy for command execute or permanent proxy setting.
    * http and https proxy setting.
    * permanant proxy setting is supported for `zsh` only.

  Usage:
    proxy [options]

  Options:
    -h, --help                 Show help
    -v, --version              Show version
    -p, --permanent            Set proxy permanently
      --unset                  Unset proxy permanently
      --set                    Set proxy permanently
      --get                    Get proxy setting(default)
    -- [command]               Execute a command with proxy

  Examples:
    $ # Show permanent proxy setting
    $ proxy -p --get
    $ http_proxy=http://localhost:51837

    $ # Execute a command with proxy
    $ proxy -- http curl https://www.google.com
```
