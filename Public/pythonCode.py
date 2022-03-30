import numpy as np
from PIL import ImageFont, ImageDraw, Image
import cv2
import time
import sys

name = sys.argv[1]
filename = sys.argv[2]


img = cv2.imread("Public/ecard.jpeg")
img_rgb = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)







font = ImageFont.truetype('Public/font.ttf',30)
img_pil = Image.fromarray(img_rgb)
draw = ImageDraw.Draw(img_pil)
text_width, text_height = draw.textsize(text_to_be_reshaped.encode('utf8'))
draw.text((image_height/2,1100),  name,anchor="ms", font = font, fill = (0,0,0,1))
img = np.array(img_pil)

final_rgb = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)

cv2.imwrite("Public/results/"+ filename +".jpeg",final_rgb)