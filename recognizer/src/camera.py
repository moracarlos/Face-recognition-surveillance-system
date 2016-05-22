import cv2
import base64

class Camera(object):
    'Hace conexion con la camara, obtiene frames y diferencia entre la camara de la RPi o web'

    def __init__(self, rpi=False):
        #aca se deberia determinar si estamos en una RPi o una camara web
        if rpi:
            from picamera.array import PiRGBArray
            from picamera import PiCamera
            self.camera = PiCamera()
            self.camera.resolution = (320,240)
            self.camera.framerate(32)
            self.camera.start_preview
            self.rawCapture = PiRGBArray(camera, size(320,240))
        else:
            self.video = cv2.VideoCapture(0)

    
    def __del__(self):
        if rpi:
            self.camera.stop_preview()
        else:
            self.video.release()

    def get_frame(self):
        'Obtiene un frame con formato html para ser enviado al browser'
        if rpi:
            frame = self.camera.capture(self.rawCapture, format='bgr', use_video_port=True)
            frame = frame.array
            return frame
        else:

            success, frame = self.video.read()
            frame = cv2.resize(frame, (320, 240), None, cv2.INTER_CUBIC)
            return frame

    def encode_frame(self, frame):
        'Codifica el frame a base64'
        ret, jpeg = cv2.imencode('.jpg', frame)
        b64 = base64.encodestring(jpeg)
        #html = "data:image/jpeg;base64,"+b64
        return b64
