import sys
import decimal
import re
from fractions import Fraction

with open(sys.argv[1]) as f:
    text = f.read()

sum = 0

for machineTxt in text.split('\n\n'):
    [aTxt, bTxt, pTxt, *_] = machineTxt.split('\n')
    off = re.compile(r'X\+(\d+), Y\+(\d+)')
    pri = re.compile(r'X\=(\d+), Y\=(\d+)')
    [axT, ayT] = off.findall(aTxt)[0]
    ax = Fraction(axT)
    ay = Fraction(ayT)
    [bxT, byT] = off.findall(bTxt)[0]
    bx = Fraction(bxT)
    by = Fraction(byT)
    [pxT, pyT] = pri.findall(pTxt)[0]
    px = Fraction(pxT)
    py = Fraction(pyT)

    ## g1: z1 * ax + z2 * bx = px
    ## g2: z1 * ay + z2 * by = py
    ##
    ##hint: https://dev.to/grantdotdev/advent-of-code-24-day-13-claw-contraption-n2p use matrix to solve equation? gramer?
    ## https://www.sofatutor.com/mathematik/terme-und-gleichungen/lineare-gleichungssysteme/lineare-gleichungssysteme-mit-zwei-variablen additionsverfahren
    # => I think the addition solving is the reason why we have floating point issues. Fractions seem to avoid this issue

    px += 10000000000000
    py += 10000000000000

    # we need to calculate the factor to multiply g1 with
    factor = -Fraction(int(ay), int(ax))

    mulAx = ax * factor
    mulBx = bx * factor
    mulPx = px * factor

    sumedA = mulAx + ay # hopefully 0
    if sumedA != 0:
        print('sumedA', sumedA)
        # continue

    sumedB = mulBx + by
    sumedP = mulPx + py

    z2 = sumedP / sumedB

    ## into g2:
    ## z1 * ay + z2 * by = py 
    ## z1 = (py - z2 * by) / ay
    z1 = (py - (z2 * by)) / ay
    print(z1, z2)
    if z1 % 1 == 0 and z2 % 1 == 0:
        sum += z1 * 3 + z2

print(sum)
