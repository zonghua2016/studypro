function isValNum(val) {
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9[0-9]*$])|(^-?0{1}$)/).test(val + '');
}
Vue.component('input-number', {
    template: `
        <div class="input-number">
            <input type="text"
                :value="curval"
                @change="handleChange" />
                <button @click="handleDown" :disabled="curval <= min">-</button>
                <button @click="handleUp" :disabled="curval >= max">+</button>
        </div>
    `,
    props: {
        max: {
            type: Number,
            detault: Infinity
        },
        min: {
            type: Number,
            defatult: -Infinity
        },
        value: {
            type: Number,
            defatult: 0
        }
    },
    data() {
        return {
            curval: this.value
        }
    },
    mounted() {
        this.updateVal(this.value);
    },
    methods: {
        updateVal(val) {
            if (val > this.max) {
                val = this.max;
            }
            if (val < this.min) {
                val = this.min;
            }
            this.curval = val;
        },
        handleDown() {
            if (this.curval <= this.min) {
                return;
            }
            this.curval -= 1;
        },
        handleUp() {
            if (this.curval >= this.max) {
                return;
            }
            this.curval += 1;
        },
        handleChange(e) {
            var val = e.target.value.trim();
            var max = this.max;
            var min = this.min;
            if (isValNum(val)) {
                val = Number(val);
                this.curval = val;
                if (val > max) {
                    this.curval = max;

                } else if (val < min) {
                    this.curval = min;
                }
            } else {
                e.targetl.value = this.curval;
            }
        }
    },
    watch: {
        curval(val) {
            this.$emit('input', val);
            this.$emit('on-change', val);
        },
        value(val) {
            this.updateVal(val);
        }
    }
});