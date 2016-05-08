from csvmaker import CSVmaker
import numpy as np
import cv2
try:
	import simplejson as json
except:
	import json
import base64

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
		people = '['
		gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
		faces = self.faceCascade.detectMultiScale(
			gray,
			scaleFactor=1.1,
			minNeighbors=5,
			minSize=(30, 30),
			flags=cv2.CASCADE_SCALE_IMAGE
		)
		index = 0
		for (x,y,w,h) in faces:
			cv2.rectangle(frame, (x,y), (x+w, y+h), (0,255,0), 2)
			face = gray[y:y+h, x:x+w]
			faceResized = cv2.resize(face, (self.imgWidth, self.imgHeight), None, cv2.INTER_CUBIC) #No se necesita en LBPH
			prediction, confidence = self.faceRecognizer.predict(faceResized)
			#print self.dictionary[prediction]
			if index == 0:
				people += '{"name": "%s", "confidence": %f, "x":%f, "y": %f,"w": %f,"h": %f}' % (self.dictionary[prediction], confidence, x, y, w, h)
			else:
				people += ',{"name": "%s", "confidence": %f, "x":%f, "y": %f,"w": %f,"h": %f}' % (self.dictionary[prediction], confidence, x, y, w, h)
			index+=1
		people+=']'

		final_object = '{ "image": "%s", "people": %s }' % (self.encode_frame(frame), people)
		return final_object

	def encode_frame(self, frame):
		'Codifica el frame a base64'
		ret, jpeg = cv2.imencode('.jpg', frame)
		b64 = base64.b64encode(jpeg)
		#html = "data:image/jpeg;base64,"+b64
		return b64

