# -*- coding: utf-8 -*-

from tasks import background_rss


def main():
    background_rss.delay()


if __name__ == '__main__':
    main()
