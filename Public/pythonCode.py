import numpy as np
from PIL import ImageFont, ImageDraw, Image
import cv2
import time
import arabic_reshaper
from bidi.algorithm import get_display
import matplotlib.pyplot as plt
import sys

name = sys.argv[1]
filename = sys.argv[2]


img = cv2.imread("Public/ecard.png")
img_rgb = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)


text_to_be_reshaped = name
reshaped_text = arabic_reshaper.reshape(text_to_be_reshaped)
bidi_text = get_display(reshaped_text)
image_width, image_height , t = img_rgb.shape





font = ImageFont.truetype('Arial', 100)
img_pil = Image.fromarray(img_rgb)
draw = ImageDraw.Draw(img_pil)
text_width, text_height = draw.textsize(text_to_be_reshaped.encode('utf8'))
draw.text((image_height/2,2350),  bidi_text,anchor="ms", font = font, fill = (255,255,255,1))
img = np.array(img_pil)

final_rgb = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)

cv2.imwrite("Public/"+ filename +".png",final_rgb)