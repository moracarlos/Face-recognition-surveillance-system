from csvmaker import CSVmaker
import numpy as np
import cv2

class Recognizer(object):
	def __init__(self):
		csv = CSVmaker()
		csv.loadFaces()
		self.dictionary = csv.dictionary
		self.faceCascade = cv2.CascadeClassifier("../../assets/haarcascades/haarcascade_frontalface_alt.xml")
		images = csv.images
		labels = np.asarray(csv.labels)

		#imgHeight, imgWidth, channels = images[0].shape
		self.imgWidth = 300
		self.imgHeight = 300

		for i in range(0, images.__len__()):
		    images[i] = cv2.resize(images[i], (self.imgWidth, self.imgHeight), None, cv2.INTER_CUBIC)
		    images[i] = cv2.cvtColor(images[i], cv2.COLOR_BGR2GRAY) #Necesaria
		    #cv2.imshow("vent", images[i])
		    #cv2.waitKey(0)

		self.faceRecognizer = cv2.createFisherFaceRecognizer()
		self.faceRecognizer.train(images, labels)
		print "trained"

	def __del__(self):
		print 'destroy'

	def predict(self, frame):
		gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
		faces = self.faceCascade.detectMultiScale(
			gray,
			scaleFactor=1.1,
			minNeighbors=5,
			minSize=(30, 30),
			flags=cv2.CASCADE_SCALE_IMAGE
		)
		for (x,y,w,h) in faces:
			cv2.rectangle(frame, (x,y), (x+w, y+h), (0,255,0), 2)
			face = gray[y:y+h, x:x+w]
			faceResized = cv2.resize(face, (self.imgWidth, self.imgHeight), None, cv2.INTER_CUBIC) #No se necesita en LBPH
			prediction, confidence = self.faceRecognizer.predict(faceResized)
			print self.dictionary[prediction]
    	#for (x, y, w, h) in faces:
		#	cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
		#	face = gray[y:y+h, x:x+w]
		#	faceResized = cv2.resize(face, (imgWidth, imgHeight), None, cv2.INTER_CUBIC) #No se necesita en LBPH
		#	prediction, confidence = faceRecognizer.predict(faceResized)

		return frame
