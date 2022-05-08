import { makeObservable, observable, action } from "mobx";

class TestStore {
  @observable allPods: Iallpods = {};

  resourceVersion: string = "";

  constructor() {
    makeObservable(this);
  }

  async createStream() {
    try {
      console.log("start");
      const response = await fetch(
        `/api/v1/pods?watch=1&resourceVersion=${this.resourceVersion}`
      );
      console.log("done");
      const stream = response?.body?.getReader();
      const utf8Decoder = new TextDecoder("utf-8");

      if (!stream) {
        console.log("err");
        return;
      }
      const res = await stream.read();
      console.log(res);
      // const stream = response.body.getReader();
      // try {
      //   const res = await stream.read();
      //   processText(res, stream);
      // } catch {
      //   console.log("stream fail");
      // }
    } catch (error) {
      console.log("error");
      setTimeout(() => this.createStream(), 5000);
    }
  }

  setPodInfo(pods: Item[]) {
    const newAllpods: Iallpods = {};
    pods.forEach((pod) => {
      if (!pod.spec.nodeName) return;
      if (!newAllpods[pod.spec.nodeName]) {
        newAllpods[pod.spec.nodeName] = [
          {
            name: pod.metadata.name,
            namespace: pod.metadata.namespace,
            statusPhase: pod.status.phase,
          },
        ];
      } else {
        newAllpods[pod.spec.nodeName].push({
          name: pod.metadata.name,
          namespace: pod.metadata.namespace,
          statusPhase: pod.spec.nodeName,
        });
      }
    });
    return newAllpods;
  }

  @action
  init = async () => {
    const res = await fetch("/api/v1/pods");
    const { metadata, items }: InitResponse = await res.json();
    this.resourceVersion = metadata.resourceVersion;
    this.allPods = this.setPodInfo(items);
    this.createStream();
  };
}

interface Item {
  metadata: {
    annotations: { [key: string]: string };
    creationTimestamp: string;
    labels: { component: string };
    managedFields: any;
    name: string;
    namespace: string;
    resourceVersion: string;
    uid: string;
  };
  spec: {
    containers: any[];
    dnsPolicy: string;
    nodeName: string;
    preemptionPolicy: string;
    restartPolicy: string;
    schedulerName: string;
    serviceAccount: string;
    serviceAccountName: string;
    terminationGracePeriodSeconds: number;
    priority: number;
    tolerations: any[];
    volumes: any[];
    enableServiceLinks: boolean;
  };
  status: {
    conditions: any[];
    containerStatuses: any[];
    hostIP: string;
    phase: string;
    podIP: string;
    podIPs: any[];
    qosClass: string;
    startTime: string;
  };
}

interface Iallpods {
  [key: string]: {
    name: string;
    namespace: string;
    statusPhase: string;
  }[];
}

interface InitResponse {
  apiVersion: string;
  items: Item[];
  kind: string;
  metadata: { resourceVersion: string };
}

export default TestStore;
