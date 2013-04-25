NFC driver for Ninja Blocks

Emits a Ninja Block event with the NFC tag's UID after reading a NFC tag.

This was developed with a [SCL3711 NFC Reader](http://www.identivenfc.com/en/nfc-readers/contactless-mobile-reader-scl3711.htm) on a Mac emulating the Ninja Block.

It requires [libnfc](http://nfc-tools.org/) and the [nfc npm package](https://npmjs.org/package/nfc).

On Mac use Homebrew

    $ brew install libnfc

Theoretically this should work on Linux with apt-get install libnfc.

Use Node 0.8.x.  The nfc npm was not working with Node 0.10.4.

Have your Mac emulate a Ninja Block server. Follow these instructions http://nodeph.ninjablocks.com/#drivers

Install the ninja-nfc driver

    $ cd client/drivers
    $ git clone git@github.com/don/ninja-nfc.git

Troubleshooting

If the ninja dashboard reports no drivers, something broke.  Something was flaky on my mac. It didn't like when I killed the ninja client. Swapping the NFC reader from one USB port to the other seemed to fix this.

Future:
 * Get this working Ninja Hardware (as soon as it arrives)
 * Get the NDEF message from the tag
