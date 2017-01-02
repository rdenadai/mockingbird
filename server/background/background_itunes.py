# -*- coding: utf-8 -*-

from tasks import background_itunes


def main():
    background_itunes.delay()


if __name__ == '__main__':
    main()
