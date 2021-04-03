import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '@prisma/client';
import * as admin from 'firebase-admin';

const cert = {
  type: 'service_account',
  project_id: 'skatguard',
  private_key_id: 'acccb93cfb8339115d48484e041f5141f12085f0',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDi1SLbHhchK2sV\nuxtGTtwMtzdiRK1pNhcCd8TOPsUGR+ePLWqq3qq/vWBjWkQGewmZ9a5HIpBFZ4Ae\nJsD50uS/GD78fwv7C8pvXMbRjcP1ojGMF9Ok/kOHFy1nMaj+vARPHTu7K9frOqnq\nPOcSEQcLTiD2Pw9qBEiiM0QXQXJt3m6qAV7rD9Spp1NHLDklxYB9ETWDKeJPdsbf\nwbm4n2XchEGiYUN2CNo3iMmCLV/xJSPsyjaU9uq5GnOImitduqLjDomq7RUAADyo\nmH8JQQSoO41n9mgUFSx3fDpx9tqZZb+nL6AyEcfLjd8uSq1uhPiSiGbl6t9crc6Y\nOsB3343BAgMBAAECggEACYRYa7Rt01Ycrmhk8uSOIPkdmWw45l1+8Ps7cPfQkRHl\nP5bv5G673+2Uegv90f50NFcgJ8XlzbOo/BreJTKEUcGKVaey8KaEU3sjWwQaq6ym\nwtz2Y/QduzDta735UYQWnjHOIW1BKD0UMfVk2yzcYcy2X1PdVAe3+xjcNimTISmM\nEYbb+b2YLM94wicqJ6XT36rokWq/BwbWriS6j0dTEqGoVLxhpGACfrXfu0JsMpSQ\nT7JGgxO2g2HUF3FikVcfr/kl+PS6sN8lTxDZrb+Hm74oIthVn1UM+onmq3YeHiug\nLh1p2qvOQ5lsYwMAxfz8O4/10YzJaMV4iCNuWJL/EQKBgQDzolYFjNHUm9qlXMFE\nRaT9fQQdl2dTIQ4KNaIi2yPnLynzj7bFz4Gqp4itL1Rz3KE9MOBvCaaLOu4hfAoA\nMtcJmlUu7UYOGEZtU3Ej0n+YzWTycc0kQE8qCFWK98FmURGTeT+bo4Y1jTvCtchB\nZeJYQLQWY84LZ18iNXeyYULpnQKBgQDuWH0fpqdWcjJTNP/0Fgjoh1Fgom2jxyvY\nKZLA2oOP38b1bxy5GnkD7HKVzz+iKB61lTieHKgVGGlh6cqqtkqw/C2k5wxyuUCD\nD+7WBaPn32QhxfvJnXaYbdPt4lkO9eUpgO3w/1rKsA8EURdICPfTQfP2/VLUvoMn\noJ3E4OQddQKBgQCEwIna0FZtYNcMj7QHfWNfdEVP0nXMiBBcY8kK8RlpGPvk6QQQ\nWPcwg8UniMidsTRyYTWJi1qiNuQWfr38Sbd+VgfgYA1yFKwbWgImIMbB/fjpWjUL\ncbcxEgV6iXFqTPYkw0ZzifDRMTnE6MRLTja9G9SE9rEI6bSesT+dhP2uyQKBgAUW\ngH1HenT+9RIPpJMaUVBdayBL91kyrD3uDULupzZQCZg9qfhNl129E2kdRnd4sccg\ni1fctr3UipNbgUcJoyiKCZNmlz5vs+/YTDnnXutZOnL6Hfjc0qZIWejPFyWZnC25\nodquKMsA3SEzdfLEtj2dP87682S1OGmFJTkJr/TtAoGBAO4fh90/4pTDnxMYYNRH\n5oQ4at6pdfW+UcmOa/FFzCuv09F/32YPCb+zRWaCmplnB1BgKfxZuXe2m1b8K3mR\nm9cZzsmJ/xZbmxVMUigVxDHm4n9nosUIdYUqYKDhGDzTZzI4lHncHWFxT3helSH3\n6a1i/tWO9YYeNbaTEiqH/NVt\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-mqen8@skatguard.iam.gserviceaccount.com',
  client_id: '116817871807152333197',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-mqen8%40skatguard.iam.gserviceaccount.com',
};

@Injectable()
export class FirebaseService {
  constructor(private eventEmitter: EventEmitter2) {
    admin.initializeApp({
      credential: admin.credential.cert(cert as object),
    });

    eventEmitter.on('fb.send', this.sendMessage.bind(this));
  }

  async sendMessage(userId: number, title: string, message: string) {
    await admin.messaging().send({
      notification: {
        title: title,
        body: message,
      },
      topic: `user-${userId}`,
    });
  }
}
