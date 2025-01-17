export class GameClient {
    private serverPublicKey: CryptoKey | null = null;

    constructor(private serverUrl: string) {}

    // Метод для получения публичного ключа с сервера
    async fetchPublicKey(): Promise<void> {
        const response = await fetch(`${this.serverUrl}/api/game/publicKey`);
        const publicKeyBase64 = await response.text();

        // Декодируем публичный ключ из Base64
        const publicKeyBuffer = this.base64ToArrayBuffer(publicKeyBase64);

        // Импортируем публичный ключ для шифрования
        this.serverPublicKey = await window.crypto.subtle.importKey(
            "spki",
            publicKeyBuffer,
            {
                name: "RSA-OAEP",
                hash: "SHA-256",
            },
            true,
            ["encrypt"]
        );
    }

    // Метод для отправки зашифрованных данных
    async sendScore(score: number): Promise<void> {
        if (!this.serverPublicKey) {
            throw new Error('Public key is not loaded. Call fetchPublicKey() first.');
        }

        // Преобразуем очки в строку и затем в ArrayBuffer
        const scoreText = score.toString();
        const scoreBuffer = new TextEncoder().encode(scoreText);

        // Шифруем данные
        const encryptedData = await window.crypto.subtle.encrypt(
            {
                name: "RSA-OAEP",
            },
            this.serverPublicKey,
            scoreBuffer
        );

        // Кодируем зашифрованные данные в Base64
        const encryptedDataBase64 = this.arrayBufferToBase64(encryptedData);

        // Отправляем зашифрованные данные на сервер
        const response = await fetch(`${this.serverUrl}/api/game/submitScore`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ encryptedData: encryptedDataBase64 }),
        });

        const responseText = await response.text();
    }

    // Вспомогательный метод: Преобразование Base64 в ArrayBuffer
    private base64ToArrayBuffer(base64: string): ArrayBuffer {
        const binaryString = atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }

    // Вспомогательный метод: Преобразование ArrayBuffer в Base64
    private arrayBufferToBase64(buffer: ArrayBuffer): string {
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }
}