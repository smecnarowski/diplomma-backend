import * as path from 'path';
import { spawn } from 'child_process';
import { Controller, Get, Query } from '@nestjs/common';
import { ParseFloatPipe } from 'src/components/pipes/ParseFloat.pipe';

@Controller('maths')
export class MathsController {
  @Get('aoi')
  async getAOI(
    @Query('opta', ParseFloatPipe) opta: number,
    @Query('surfaceAzimuth', ParseFloatPipe) surfaceAzimuth: number,
    @Query('surfaceTilt', ParseFloatPipe) surfaceTilt: number,
  ) {
    let promise = new Promise<string>(
      (resolve, reject) => {
        let dataToSend = '1'
        const scriptFilename = path.join(__dirname, 'scripts', `AOI.py ${opta} ${surfaceAzimuth} ${surfaceTilt}`);
        const python = spawn('python3', [scriptFilename]);

        python.stdout.on('data', function (data) {
          dataToSend = parseFloat(data.toString()).toFixed(4);
        });

        python.stderr.on('data', function (err) {
          console.log(err.toString())
        })
        
        python.on('close', (code) => {
          console.log(code)
          resolve(dataToSend)
        });   
      }
    );    
    const martinRuizDiffuse = await promise;
    return {
      martinRuizDiffuse
    }
  }
}
