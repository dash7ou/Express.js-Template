import AWS from "aws-sdk";

const configS3Object = async () => {
    return new Promise((resolve, reject) => {
        try {
            AWS.config.update({
                region: process.env.AWS_CONFIG_REGION,
                accessKeyId: process.env.AWS_CONFIG_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_CONFIG_SECRET_ACCESS_KEY
            })

            const s3 = new AWS.S3({
                params: {
                    Bucket: process.env.AWS_CONFIG_BUCKET_NAME
                }
            });

            resolve(s3)
        } catch (err) {
            reject(err);
        }
    })
}


export default configS3Object;