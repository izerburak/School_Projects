import math
import timeit
import random
import sympy
import warnings
from random import randint, seed
import sys
from ecpy.curves import Curve, Point
from Crypto.Hash import SHA3_256
import requests
from Crypto.Cipher import AES
from Crypto import Random
from Crypto.Util.Padding import pad
from Crypto.Util.Padding import unpad
import Crypto.Random.random
import random
import re
import json
import time


def keyGeneration(n, P):
    s_a = Crypto.Random.random.randint(1, n-1)
    Q_a = s_a * P
    return s_a, Q_a


def signatureGeneration(m, P, n, s_l):
    m_ = m.encode()
    k = Crypto.Random.random.randint(0, n-1)
    R = k * P
    r = (R.x) % n
    toHash = m_ + r.to_bytes((r.bit_length()+7)//8, byteorder='big')
    h_ = int.from_bytes(SHA3_256.new(toHash).digest(), "big")
    h = h_ % n
    s = (s_l * h + k) % n
    return h, s


def signatureVerification(m, P, Q_a, h, s):
    m_ = m.encode()
    V = s*P - h*Q_a
    v = V.x % n
    toHashPrime = m_ + v.to_bytes((v.bit_length()+7)//8, byteorder='big')
    hPrime_ = int.from_bytes(SHA3_256.new(toHashPrime).digest(), "big")
    hPrime = hPrime_ % n
    return hPrime == h


def resetEphemeral():
    API_URL = 'http://cryptlygos.pythonanywhere.com'

    stuID = 25388  # 24198,19872, 23574, 25655
    E = Curve.get_curve('secp256k1')
    n = E.order
    P = E.generator

    # long term keys
    s_l, Q_l = 13085853449963706822679688925724357385610122371856980557637515554534105534392, Point(
        99706965781601861644488801678706331501908275461350155965248416002017363728845, 34959479883630730429995407912028272742489857511375877620317188275102881036203, E)

    h, s = signatureGeneration(str(stuID), P, n, s_l)
    mes = {'ID': stuID, 'S': s, 'H': h}
    response = requests.get('{}/{}'.format(API_URL, "RstEKey"), json=mes)
    print(response.json())
