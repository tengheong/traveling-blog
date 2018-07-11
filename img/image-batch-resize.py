#!/usr/bin/env python
__author__ = 'Alex Galea'

''' Script to resize all files in current directory,
    saving new .jpg and .jpeg images in a new folder. '''

import cv2
import glob
import os
import fnmatch

# Setup
destinations = [('test', 42)]

for destination, _ in destinations:
    if not os.path.exists(destination):
        os.makedirs(destination)

# Compile list of images to resize
imgs = []
for root, dirnames, filenames in os.walk('.'):
    for filename in fnmatch.filter(filenames, '*.jpg'):
        imgs.append(os.path.join(root, filename))

        # Replicate the directory structure in resized and thumbnail
        for destination, _ in destinations:
            dest_dir = os.path.join(destination, root)
            if not os.path.exists(dest_dir):
                os.makedirs(dest_dir)

# Iterate through resizing and saving
for img in imgs:
    for destination, width in destinations:
        pic = cv2.imread(img, cv2.IMREAD_UNCHANGED)
        height = int(width * pic.shape[0] / pic.shape[1])
        pic = cv2.resize(pic, (width, height))
        cv2.imwrite(destination + '/' + img, pic)
