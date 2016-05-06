import os
import cv2
import shutil

tempPath = 'assets/faces/generated/'
fileName = 'assets/faces/generated/gen.csv'

if os.path.exists(tempPath):
    shutil.rmtree(tempPath)


os.mkdir(tempPath)

video_capture = cv2.VideoCapture(0)
faces_count = 0
faceCascade = cv2.CascadeClassifier("./assets/haarcascades/haarcascade_frontalface_alt.xml")

#File
if os.path.exists(fileName):
    shutil.rmtree(fileName)


while True:
    ret, frame = video_capture.read()

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30),
        flags=cv2.CASCADE_SCALE_IMAGE
    )

    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
        face = gray[y:y+h, x:x+w]
        break
    # Display the resulting frame
    cv2.imshow('Video', face)

    pressed = cv2.waitKey(0)
    if pressed == ord('s'):
        print 'Saving '+tempPath+str(faces_count)+'.jpg'
        cv2.imwrite(tempPath + str(faces_count) + '.jpg', face)
        with open(fileName, 'a') as f:
            f.write(tempPath+str(faces_count)+'.jpg;n\n')
            f.close()
        faces_count += 1

    elif pressed == ord('n'):
        print 'Don\'t save'
    elif pressed == ord('q'):
        'Bye'
        break
