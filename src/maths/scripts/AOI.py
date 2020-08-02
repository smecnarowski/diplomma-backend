import sys
# pylint: disable=import-error
import pvlib

args = sys.argv[1:]
system = pvlib.pvsystem.PVSystem(surface_tilt=float(args[2]), surface_azimuth=float(args[1]))
aoi = system.get_aoi(float(args[0]), 180)
iam = pvlib.iam.martin_ruiz_diffuse(aoi)
print(iam[1])