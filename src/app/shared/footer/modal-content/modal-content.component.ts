import {Component, OnInit} from '@angular/core';
import {Camera, CameraSource, CameraResultType} from '@capacitor/camera';
import {options} from "ionicons/icons";
import {Capacitor} from "@capacitor/core";

@Component({
    selector: 'app-modal-content',
    templateUrl: './modal-content.component.html',
    styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent implements OnInit {
    path: string = '';

    constructor() {
    }

    async ngOnInit() {
        await this.checkCameraPermissions();
    }

    async capturePhoto() {
        try {
            const options = {
                quality: 90,
                resultType: CameraResultType.DataUrl,
                source: CameraSource.Prompt
            };

            const image = await Camera.getPhoto(options);
            if (image.dataUrl) {
                this.path = image.dataUrl;
            }
        } catch (error) {
            alert('Ошибка при захвате фото: ' + (error instanceof Error ? error.message : String(error)));
            console.error('Error capturing photo', error);
        }
    }

    async checkCameraPermissions() {
        if (Capacitor.isNativePlatform()) {
            const cameraPermission = await Camera.requestPermissions({ permissions: ['camera'] });
            if (cameraPermission.camera) {
                console.log('Camera permission granted');
            } else {
                console.error('Camera permission denied');
            }
        } else {
            console.log('Running on web platform, camera permissions not required');
        }
    }

}
