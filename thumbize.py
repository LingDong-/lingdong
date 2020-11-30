# resize images to sizes appropriate for thumbnails
# python3
from glob import glob
import os

imgs = glob("media_raw/*.*");

for img in imgs:
  print(img);
  outfile = img.replace("media_raw","media");
  if os.path.exists(outfile):
    continue
  os.system(f'convert {img} -resize "512^>" {outfile}');