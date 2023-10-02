import { useRef, useState } from "react";
import styles from "./Home.module.css";
import { Button, Form, Input, notification } from "antd";
import { url } from "../../utils/constants";
import useOnline from "../../hook/useOnline";
import { SYNC, writeData } from "../../utils/indexDb";
import { validationRules } from "../../utils/validationRules";
function Home() {
  const [location, setLocation] = useState<{
    lat: number;
    long: number;
  } | null>(null);
  const [declinedLocation, setDeclinedLocation] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const online = useOnline();
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
  const sendOrSync = (formData: FormData) => {
    // console.log(window);
    if (navigator.serviceWorker && "SyncManager" in window) {
      navigator.serviceWorker.ready.then((sw) => {
        const postData = {
          id: formData.get("id"),
          title: formData.get("title"),
          location: formData.get("location"),
          image: formData.get("image"),
        };
        writeData(SYNC, postData)
          .then(() => {
            return sw.sync.register("sync-post");
          })
          .then(() => {
            notification.success({ message: "POST stored for sync" });
          });
      });
    }
  };
  const finishHandler = async () => {
    console.log(location);
    try {
      console.log(await postForm.validateFields());
      await postForm.validateFields();
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
      if (!online) {
        sendOrSync(formData);
        return;
      }
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
    <div className={`${styles.homeContainer} ${!online ? styles.offline : ""}`}>
      <div className={styles.home}>
        <div className={styles.form}>
          <Form
            onSubmitCapture={finishHandler}
            form={postForm}
            layout="vertical"
          >
            <Form.Item rules={validationRules.title} label="Title" name="title">
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
              <Form.Item
                rules={validationRules.location}
                label="location"
                name="location"
              >
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
