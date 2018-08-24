Vue.components('input-number', {
    template: `
        <div class="input-number">
            <input type="text"
                :value="curval"
                @change="handleChange" />
            <button @click="handle"
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
})