import { useRef, useState } from "react";
import styles from "./Home.module.css";
import { Button, Form, Input, notification } from "antd";
import { url } from "../../utils/constants";
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
    console.log(location);
    try {
      if (!inputRef?.current?.files?.[0]) {
        throw new Error("Please select an Image");
      }

      console.log(postForm.getFieldsValue());
      const antDForm = postForm.getFieldsValue();
      const formData = new FormData();
      formData.append("title", antDForm.title);
      formData.append("image", inputRef.current?.files[0]);
      if (declinedLocation) {
        formData.append("location", antDForm.location);
      } else {
        formData.append("location", `${location?.lat}|${location?.long}`);
      }
      formData.append("id", new Date().getTime().toString());
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((data) => {
          notification.success({ message: "post added successfully!" });
          // setLocation(null);
          // setDeclinedLocation(false);
          // postForm.resetFields();
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      if (err instanceof Error) {
        notification.error({ message: err.message });
      }
    }
  };
  return (
    <div className={styles.homeContainer}>
      <div className={styles.home}>
        <div className={styles.form}>
          <Form
            onSubmitCapture={finishHandler}
            form={postForm}
            layout="vertical"
          >
            <Form.Item required label="Title" name="title">
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
              <Form.Item required label="location" name="location">
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
