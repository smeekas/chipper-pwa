import  { useRef, useState } from "react";
import styles from "./Home.module.css";
import { Button, Form, Input } from "antd";
function Home() {
  const [location, setLocation] = useState<{
    lat: number;
    long: number;
  } | null>(null);
  const [declinedLocation, setDeclinedLocation] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log(pos);
        setLocation({ lat: pos.coords.latitude, long: pos.coords.longitude });
        // console.log(pos.coords.latitude);
      },
      () => {
        setDeclinedLocation(true);
      }
    );
  };
  const [postForm] = Form.useForm();
  const finishHandler = () => {
    console.log(location)
    console.log(postForm.getFieldsValue());
  };
  return (
    <div className={styles.homeContainer}>
      <div className={styles.home}>
        <div className={styles.form}>
          <Form onFinish={finishHandler} form={postForm} layout="vertical">
            <Form.Item label="Title" name="title">
              <Input type="text" />
            </Form.Item>
            <div>
              <input
                onChange={(e) => {
                  e?.target?.files?.[0] &&
                    setFileUrl(URL.createObjectURL(e.target.files[0]));
                }}
                ref={inputRef}
                type="file"
              />
              {fileUrl && <img width={100} src={fileUrl} />}
            </div>
            {declinedLocation && (
              <Form.Item label="location" name="location">
                <Input type="text" />
              </Form.Item>
            )}

            {!declinedLocation && (
              <Button onClick={getLocation}>Get Location</Button>
            )}
            <Button htmlType="submit">Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Home;
