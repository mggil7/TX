import * as S from "./styles";
import React, { useState, useEffect, useRef } from "react";

import api from '../../services/api';

import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

function AlarmeHe ({PatualHe1,
  AlarmeHe1,
  DataConectado_He1,
  HoraConectado_He1}) {
  const [valoresNow, setCilindrosNow] = useState([0]); // armazena valores atuais
  const [PRESSAO_ALARME_He1_gravado, setPA_gravado] = useState([]); // PRESSÃO DE ALARME GRAVADA NO BANCO DE DADOS
  const refPressaoAtual = useRef(null);
  const refPressaoAlarme = useRef(null);

  async function loadCilindrosNow() {
    await api
      .get(
        "https://z3rh89xnof.execute-api.sa-east-1.amazonaws.com/prod/today2?deviceID=Aliine"
      )

      .then((response) => {
        setCilindrosNow(response.data);
        //console.log("load CILINDROS Now :", response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(()=> {
    loadCilindrosNow();


  },[PatualHe1]);

  {
    valoresNow.map((t) => (PatualHe1 = t.He));
  }

  async function loadAlarmesNow() {
    await api
      .get(
        "https://z3rh89xnof.execute-api.sa-east-1.amazonaws.com/prod/getalarme?deviceID=Aliine"
      )

      .then((response) => {
        setPA_gravado(response.data);
        //console.log("load Alarme Now :", response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    loadAlarmesNow();
  },[AlarmeHe1, DataConectado_He1, HoraConectado_He1]);


  {
    PRESSAO_ALARME_He1_gravado.map((t) => (AlarmeHe1 = t.AlarmeHe1));

    PRESSAO_ALARME_He1_gravado.map((t) => (DataConectado_He1 = t.DataConectado));

    PRESSAO_ALARME_He1_gravado.map((t) => (HoraConectado_He1= t.HoraConectado));
  }


  const registerUrl =
  "https://z3rh89xnof.execute-api.sa-east-1.amazonaws.com/prod/alarme2";

const requestConfig = {
  headers: {
    "x-api-key": "okz9F4RqjGLRbIpYfnS190JZBOt51Av2SwK5Xjw5",
    //'Content-Type': 'application/json',
    //"Access-Control-Allow-Headers" : "Content-Type",
    //"Access-Control-Allow-Origin": "*",
    //"Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  },
};


let ddata = new Date().toLocaleDateString();
let hora = new Date().toLocaleTimeString();

   // HORA: hora,
 // ddata: ddata,

const requestBody = {
  id: (Date.now() / 1000).toFixed(0),
  deviceID: "Aliine",
  Ux: Math.round((Date.now() / 1000)),
  idGas: "He1",
  DataConectado: ddata,
  HoraConectado: hora,
  Pressao_He1: PatualHe1,
  AlarmeHe1: PRESSAO_ALARME_He1_gravado,
  Track_AlarmeHe1: "Track_AlarmeHe1",
};

// função para setar e gravar a pressão de alarme

async function alarme2( requestBody,requestConfig ) {
  // await api.post(registerUrl, requestBody, requestConfig)

  await api
    .post(
      "https://z3rh89xnof.execute-api.sa-east-1.amazonaws.com/prod/alarme2?",
      requestConfig,
      requestBody
      
    )

    .then((response) => {
      //console.log("Registro gravado com sucesso!");
      alert("Novo valor de alarme do Hélio gravado com sucesso!");
    })
    .catch((error) => {
      console.log(error);
    });
}

  

  return (


    <S.Container>
    <S.FeaturedContainer>
      <S.FeaturedItem>
        <S.FeaturedTitle>Manômetro (bar): </S.FeaturedTitle>
        <S.FeaturedValueContainer>
          {valoresNow.map((valor,index)=> (
             <span className="featuredMoney" ref={refPressaoAtual} id="pressao_atual" key={index}>
             {valor.He}
           </span>
          ))}
        </S.FeaturedValueContainer>
        </S.FeaturedItem>

        <S.FeaturedItem>
          <S.FeaturedTitle>Alarme (bar):</S.FeaturedTitle>
          <S.FeaturedValueContainer>
            {PRESSAO_ALARME_He1_gravado.map((valorPA) => (
              <span className="featuredMoney" ref={refPressaoAlarme} key={valorPA.id}>
                {valorPA.AlarmeHe1}
              </span>
            ))}

          </S.FeaturedValueContainer>
        </S.FeaturedItem>

        <S.FeaturedItem>
          <S.FeaturedTitle>Troca ocorre (dias):</S.FeaturedTitle>
          <S.FeaturedValueContainer>
            {PRESSAO_ALARME_He1_gravado.map((valorPA) => (
              <span className="featuredMoney" ref={refPressaoAlarme} key={valorPA.id}>
                {valorPA.AlarmeHe1}
              </span>
            ))}

          </S.FeaturedValueContainer>
        </S.FeaturedItem>

        <S.FeaturedItem>
          <S.FeaturedTitle>Alarme (bar):</S.FeaturedTitle>
          <S.FeaturedValueContainer>
              <S.NOVO_Pressao_Alarme_Atual>

              <TextField
              id="label-alarme"
              type="number"
              label="Pressão de Alarme  (bar): "
              InputLabelProps={{ shrink: true }}
              placeholder={AlarmeHe1}
              inputProps={{
                type: "number",
                min: 1,
                max: PatualHe1,
                step: 0.25,
                endAdornment: (
                  <InputAdornment position="start">
                    <h2>bar</h2>
                  </InputAdornment>
                )
              }}
              onChange={(e) => setPA_gravado(e.target.value)}
              value={PRESSAO_ALARME_He1_gravado}
              />
              </S.NOVO_Pressao_Alarme_Atual>


            <S.ALARME_SAVE_BUTTON>
            <Button
              variant="contained"
              size="small"
              //color="success"
              onClick={() => alarme2(requestConfig, requestBody )}
            >
              <strong>salvar</strong>
            </Button>
            </S.ALARME_SAVE_BUTTON>

          </S.FeaturedValueContainer>
        </S.FeaturedItem>

    </S.FeaturedContainer>
    </S.Container>

  )
}

export default AlarmeHe