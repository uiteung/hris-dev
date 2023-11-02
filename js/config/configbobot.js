import { addChild } from "https://jscroot.github.io/element/croot.js";
import { tabletag, templatelevel } from "../template/url.js";
import { getRandomClass } from "./config.js";

export function IsirowBobot(value) {
    const content = templatelevel
      .replace("#kodejbt#", value.kode_jabatan)
      .replace("#namajabatan#", value.nama_jabatan)
      .replace("#honor#", value.bobot_honor)
    addChild("bodycihuy", tabletag, getRandomClass(), content);
  }

export function ResponseLevel(result) {
    console.log(result)
    result.data.forEach(IsirowBobot)
}


