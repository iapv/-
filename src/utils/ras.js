
import JSEncrypt from 'jsencrypt'
import Encrypt from 'encryptlong'

const publicKey  = "" + "-----BEGIN PUBLIC KEY-----" + "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDgS0ancrzwHJZ5wlHyr/PxEJJA" + "uDDdtAnkAs+VtKkhKM5Babhn6u8KvvEGbLNLVf9EamR267EedgmcHGqSArqBf4ti" + "ZldCSSRZ/HJMrUN9HeyGN28ylUTlkPh0SwbpgTmdmmYBWWPz+NKBXUrwLytHZ00J" + "m79FrfhNs2qGP6qA5wIDAQAB" + "-----END PUBLIC KEY-----";

// 私钥key
const privateKey = "" + "-----BEGIN RSA PRIVATE KEY-----" + "MIICXQIBAAKBgQDgS0ancrzwHJZ5wlHyr/PxEJJAuDDdtAnkAs+VtKkhKM5Babhn"
+ "6u8KvvEGbLNLVf9EamR267EedgmcHGqSArqBf4tiZldCSSRZ/HJMrUN9HeyGN28y" + "lUTlkPh0SwbpgTmdmmYBWWPz+NKBXUrwLytHZ00Jm79FrfhNs2qGP6qA5wIDAQAB"
+ "AoGBAJx4Bw8TfPjoiJTiWba6xqu6Cr05gWV4jpnQ2C2wvXgTdmetr+ZWv3G4qH35" + "4M5CbPS2X+WSIJqGb8fHDxVS7/XOwuKYSOV8jMD3nU5SPf8JerkN/vgFq83AIkhi"
+ "1tbp3xqR/MqAR2Kuxp2r0zhz0o0SBeue1c1uyEKFr3533hfpAkEA8e0pNUuUaVyl" + "+8+C7Iw8uVltK1I1XgeiyV9wpyZbXKJK7+yHJFZNdvwCrtfGxQysODNSW9apRMYR"
+ "AopHNnJ/IwJBAO1Xh1jtdG1aw3MAqDy4Bz4UdVPO4IguD8k8987RYGiRaE6i6Q2S" + "iq7IYyyzXPq4EfYZL5UlcnwaAyPuzFuZlW0CQANsBlwxoHzJCbQBIGn2Jdm9URT+"
+ "ybB1zTCp/+7tVPd/eC3im5rA+cGIGQWeGbqpzjnRSAXyiFxnrM/rYsx7XB8CQQDR" + "xJGgXEaRvC2QgB0xhSkJikVkbCzwz10ubE9NIKrH4PRCxCOc1k7ySbO1t1VPVs6x"
+ "JvNyK6Wy3760zIMb1nNFAkAtToZmN9UybSMi4+6516oowgp97DyrpVPczVsPL60K" + "g4T7rIX+CQXxP3MsdWKPS211jWOUExb3MGC83qzbehif"
+ "-----END RSA PRIVATE KEY-----"
export default {
    /* JSEncrypt加密 */
    rsaPublicData(data) {
      var jsencrypt = new JSEncrypt()
      jsencrypt.setPublicKey(publicKey)
      // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
      var result = jsencrypt.encrypt(data)
      return result
    },
    /* JSEncrypt解密 */
    rsaPrivateData(data) {
      var jsencrypt = new JSEncrypt()
      jsencrypt.setPrivateKey(privateKey)
      // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
      var result = jsencrypt.encrypt(data)
      return result
    },
    /* 加密 */
    encrypt(data) {
      const PUBLIC_KEY = publicKey
      var encryptor = new Encrypt()
      encryptor.setPublicKey(PUBLIC_KEY)
      // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
      const result = encryptor.encryptLong(data)
      return result
    },
    /* 解密 - PRIVATE_KEY - 验证 */
    decrypt(data) {
      const PRIVATE_KEY = privateKey
      var encryptor = new Encrypt()
      encryptor.setPrivateKey(PRIVATE_KEY)
      // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
      var result = encryptor.decryptLong(data)
      return result
    }
  }