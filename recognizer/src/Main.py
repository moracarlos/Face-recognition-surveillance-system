import sys
sys.path.append('/usr/local/lib/python2.7/site-packages')
import cv2
import numpy as np
from csvmaker import CSVmaker

def read_csv():
    images = []
    labels = []
    fileName = "./assets/faces/faces.csv"
    with open(fileName) as f:
        content = f.readlines()
        for l in content:
            pair = l.split(';')
            if pair.__len__() == 2:
                images.append(cv2.imread(pair[0]))
                labels.append(int(pair[1]))
                print pair[0], pair[1]

    print labels
    return images, np.array(labels)
#-----------------------------------------------------------------------------------------------

faceCascade = cv2.CascadeClassifier("./assets/haarcascades/haarcascade_frontalface_alt.xml")
video_capture = cv2.VideoCapture(0)

csv = CSVmaker()
csv.loadFaces()
images = csv.images
labels = np.asarray(csv.labels)

imgHeight, imgWidth, channels = images[0].shape
print imgWidth, imgHeight

imgWidth = 300
imgHeight = 300

for i in range(0, images.__len__()):
    images[i] = cv2.resize(images[i], (imgWidth, imgHeight), None, cv2.INTER_CUBIC)
    images[i] = cv2.cvtColor(images[i], cv2.COLOR_BGR2GRAY) #Necesaria
    #cv2.imshow("vent", images[i])
    #cv2.waitKey(0)

faceRecognizer = cv2.createFisherFaceRecognizer()
faceRecognizer.train(images, labels)
print "trained"
while True:
    # Capture frame-by-frame
    ret, frame = video_capture.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30),
        flags=cv2.CASCADE_SCALE_IMAGE
    )

    # Draw a rectangle around the faces
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
        face = gray[y:y+h, x:x+w]
        faceResized = cv2.resize(face, (imgWidth, imgHeight), None, cv2.INTER_CUBIC) #No se necesita en LBPH
        prediction, confidence = faceRecognizer.predict(faceResized)
        print prediction
    # Display the resulting frame
    cv2.imshow('Video', faceResized)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything is done, release the capture
video_capture.release()
cv2.destroyAllWindows()
