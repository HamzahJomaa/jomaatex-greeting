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


img = cv2.imread("Public/ecard.jpeg")
img_rgb = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)

reshaper = arabic_reshaper.ArabicReshaper(
    arabic_reshaper.config_for_true_type_font(
        'Public/font.ttf',
        arabic_reshaper.ENABLE_ALL_LIGATURES
    )
)

text_to_be_reshaped = name
reshaped_text = reshaper.reshape(text_to_be_reshaped)
bidi_text = get_display(reshaped_text)
image_width, image_height , t = img_rgb.shape





font = ImageFont.truetype('Public/font.ttf',50)
img_pil = Image.fromarray(img_rgb)
draw = ImageDraw.Draw(img_pil)
text_width, text_height = draw.textsize(text_to_be_reshaped.encode('utf8'))
draw.text((image_height/2,1100),  bidi_text,anchor="ms", font = font, fill = (0,0,0,1))
img = np.array(img_pil)

final_rgb = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)

cv2.imwrite("Public/results/"+ filename +".jpeg",final_rgb)