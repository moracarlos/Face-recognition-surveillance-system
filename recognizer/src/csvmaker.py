import os
import sys
sys.path.append('/usr/local/lib/python2.7/site-packages')
import cv2

class CSVmaker(object):
    'Analiza el directorio donde se almacenan los archivos de los rostros, crea la estructura de images[] y labels[] a partir de dicha estructura'

    def __init__(self):
        self.path = "../../assets/faces/"
        self.images = []
        self.labels = []
        self.paths = []
        self.dictionary = {}

    def loadFaces(self):
        if not os.path.exists(self.path):
            os.mkdir(self.path)
        names = [name for name in os.listdir(self.path) if os.path.isdir(os.path.join(self.path, name))]
        for idx, name in enumerate(names):
            self.dictionary[idx] = name
            files = [mFile for mFile in os.listdir(self.path+name) if mFile.endswith(".jpeg") or mFile.endswith(".jpg")]
            for mFile in files:
                self.labels.append(idx)
                self.paths.append(mFile)
                self.images.append(cv2.imread(self.path+name+'/'+mFile))